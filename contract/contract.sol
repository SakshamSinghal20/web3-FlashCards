// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Flashcards {
    // Flashcard structure
    struct Card {
        string question;
        string answer;
    }

    // Owner of the contract (who deployed it)
    address public owner;

    // List of all flashcards
    Card[] public cards;

    constructor() {
        owner = msg.sender; // Save deployer's address
    }

    // Modifier so only owner can add cards
    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    // Add a flashcard (only owner)
    function addCard(string memory _question, string memory _answer) public onlyOwner {
        cards.push(Card(_question, _answer));
    }

    // Get number of cards
    function totalCards() public view returns (uint) {
        return cards.length;
    }

    // Get a specific card
    function getCard(uint index) public view returns (string memory, string memory) {
        require(index < cards.length, "Card does not exist");
        Card memory card = cards[index];
        return (card.question, card.answer);
    }
}