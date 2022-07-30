// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

/**
 * Implements ERC721 Token Standard, with storage based token URI management and Access Control.
 */
contract Warranty is ERC721URIStorage, AccessControl {
    /**
     * Seller role which will be to various sellers
     * who will be given the rights to mint Warranty Nft.
     * Admin will asign this role.
     */
    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");

    using SafeMath for uint256; // safemath of uint256 to prevent overflow and underflows.
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /**
     * Initializes the contract by providing deployer DEFAULT_ADMIN_ROLE role.
     */
    constructor() ERC721("Warranty Tokens", "WATT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Struct to store the details of the Nft.
    struct warrantyNFT {
        uint256 tokenId;
        string uri;
        address mintedBy;
        address owner;
        address soldBy; // remove this
        uint256 validUntil;
    }
    event NftWarrantyCreated(
        uint256 indexed tokenId,
        string uri,
        address mintedBy,
        address owner,
        address soldBy,
        uint256 validUntil
    );

    // Mapping from {TokenId} to WarrantyNFT struct.
    mapping(uint256 => warrantyNFT) private _idToNft;

    /**
     * checks If the address {_from} has the rights to mint the nft,
     * Only DEFAULT_ADMIN_ROLE and SELLER_ROLE can mint the nft.
     */
    modifier canMint(address _from) {
        if (
            hasRole(SELLER_ROLE, _from) == true ||
            hasRole(DEFAULT_ADMIN_ROLE, _from) == true
        ) {
            _;
        } else {
            revert("You dont have the rights to create Warranty");
        }
    }

    /**
     * This function will mint the nft and store the details in the mapping.
     * @param _to The address to which the nft will be minted.
     * @param tokenURI The ipfs uri of the nft.
     * @param _minutesValid The time when the nft will be valid.
     * @return tokenId The Id of the nft token minted.
     */
    function createWarranty(
        address _to,
        string memory tokenURI,
        uint256 _minutesValid
    ) public canMint(msg.sender) returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(_to, newTokenId);
        _setTokenURI(newTokenId, tokenURI); // set the ipfs token uri.
        if (balanceOf(_to) >= 1) {
            _minutesValid.add(129600); // If user already own any warrantyNft Give him extra warranty as a perk.
        }
        uint256 t = block.timestamp + _minutesValid.mul(60);
        // push nft data to id to Nft mapping. to be used later for listing purpose.
        _idToNft[newTokenId] = warrantyNFT(
            newTokenId,
            tokenURI,
            msg.sender,
            _to,
            msg.sender,
            t
        );
        emit NftWarrantyCreated(
            newTokenId,
            tokenURI,
            msg.sender,
            _to,
            msg.sender,
            t
        );
        return newTokenId;
    }

    /**
     *  This Funtion can only be called by the DEFAULT_ADMIN_ROLE.
     *  This function will assign the SELLER_ROLE to the address {_to}.
     */
    function assignSeller(address _to) public {
        grantRole(SELLER_ROLE, _to);
    }

    /**
     * returns the Nfts Owned by {msg.sender}
     */
    function fetchMyNFTs() public view returns (warrantyNFT[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (_idToNft[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        /**
         * count the total number of nfts minted by {_by} which will be the size of returning array.
         * because we cant store the array of nfts dynamically in memory.
         */
        warrantyNFT[] memory items = new warrantyNFT[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (_idToNft[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                warrantyNFT storage currentItem = _idToNft[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /**
     * This function will return the details of the nft.
     * @param _tokenId The id of the nft.
     */
    function fetchNFTbyTokenId(uint256 _tokenId)
        public
        view
        returns (warrantyNFT memory)
    {
        warrantyNFT memory Item = _idToNft[_tokenId];
        return Item;
    }

    /**
     * gives the Nfts minted by {_by}
     * @param _by address of the minter.
     * @return warrantyNFT[] items The array of warrantyNFT.
     */
    function fetchNFTsMintedBy(address _by)
        public
        view
        returns (warrantyNFT[] memory)
    {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        /**
         * count the total number of nfts minted by {_by} which will be the size of returning array.
         * because we cant store the array of nfts dynamically in memory.
         */
        for (uint i = 0; i < totalItemCount; i++) {
            if (_idToNft[i + 1].mintedBy == _by) {
                itemCount += 1;
            }
        }
        // declare items array to be returned.
        warrantyNFT[] memory items = new warrantyNFT[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (_idToNft[i + 1].mintedBy == _by) {
                uint currentId = i + 1;
                warrantyNFT storage currentItem = _idToNft[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /**
     * transfers the ownership of nft to {_to}
     * can only be called by the owner of the nft.
     * checks if Nft is valid or not and then transfers the ownership by calling {validateNFT}.
     * @param _tokenId The id of the nft.
     * @param _to The address to which the nft will be transferred.
     */
    function resellWarrantyNft(uint256 _tokenId, address _to) public {
        require(
            _idToNft[_tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(validateNft(_tokenId) == true, "Warranty Expired");
        _idToNft[_tokenId].soldBy = msg.sender;
        _idToNft[_tokenId].owner = _to;
        _transfer(msg.sender, _to, _tokenId);
    }

    /**
     * This function will check if the current time is
     * greater than or equal to Expiry time of the warrantyNft.
     * It will burn the nft if the current time is greater than or equal to Expiry time.
     * anyone can call this function
     * @param _tokenId The id of the nft.
     * @return bool isValid The boolean value indicating if the nft is valid or not.
     */
    function validateNft(uint256 _tokenId) public returns (bool) {
        require(_exists(_tokenId) == true, "Token does not exist");
        uint256 val = _idToNft[_tokenId].validUntil;
        if (block.timestamp >= val) {
            _burn(_tokenId); // burn nft if warranty period is over
            _idToNft[_tokenId].owner = address(0);
            return false;
        } else {
            return true;
        }
    }
}
