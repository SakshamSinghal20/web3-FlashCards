# 📚 On-Chain Flashcards (Solidity + Flare Testnet)

## 🔗 Contract Address  
**0x73bF4E1220fb69672AaCd80F5e3cecE9B5748Df6**  
https://coston2-explorer.flare.network/address/0x73bF4E1220fb69672AaCd80F5e3cecE9B5748Df6  
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/fdf49d65-aa7e-49e2-ad2c-992a6345ff1c" />


---

## 📝 Project Title  
**Flashcards — A Simple On-Chain Learning Tool**

---

## 📘 Description

Flashcards is a beginner-friendly decentralized application built on the Flare Coston2 blockchain.  
It allows the contract owner to store flashcards — each containing a **question** and an **answer** — permanently on-chain.

This project demonstrates how structured data can be added, stored, and retrieved from a smart contract using a clean and minimal Solidity implementation. It is ideal for beginners learning Web3, Solidity, or basic smart contract interactions.

---

## 🚀 What This Project Does

- Lets the contract owner add study flashcards on-chain  
- Stores all flashcards permanently in an array  
- Allows anyone to read any card via `getCard`  
- Shows total number of stored flashcards  
- Enables a simple UI for interacting with the contract  

---

## ⭐ Features

### **🔐 Owner-Only Card Creation**  
Only the wallet that deployed the contract can add flashcards.  
This ensures control and prevents spam entries.

### **📚 On-Chain Flashcard Storage**  
Every card includes:
- `question` (string)  
- `answer` (string)

These are stored permanently on the blockchain.

### **🔍 Easy Retrieval**  
Anyone can:
- View total flashcards (`totalCards`)  
- Read any flashcard by index (`getCard`)  

### **🧩 Simple UI Integration**  
The included frontend:
- Connects via wallet  
- Allows adding new flashcards  
- Displays total stored cards  
- Shows transaction status (pending → confirming → confirmed)  
- Handles loading and error states gracefully  

### **👶 Beginner-Friendly Architecture**  
- No complex logic  
- Clean ABI & hook structure  
- Minimal contract using structs, arrays, and modifiers  

---

## 💡 How It Solves a Problem

Traditional flashcard tools depend on centralized servers or apps.  
This project provides:

### ✔ **Permanent storage**  
Flashcards stored on-chain can never be removed or lost.

### ✔ **Open access**  
Anyone can build interfaces or tools on top of the same data.

### ✔ **Educational value**  
Perfect for teaching:
- Smart contract basics  
- On-chain storage patterns  
- Access control  
- Frontend ↔ blockchain interaction  

### ✔ **Expandable foundation**  
Developers can extend the project with:
- User-generated decks  
- Tagging and categorization  
- Front-end flashcard viewer
- Gamified learning systems  

---

## 🛠 Included Smart Contract (Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Flashcards {
    struct Card {
        string question;
        string answer;
    }

    address public owner;
    Card[] public cards;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function addCard(string memory _question, string memory _answer) public onlyOwner {
        cards.push(Card(_question, _answer));
    }

    function totalCards() public view returns (uint) {
        return cards.length;
    }

    function getCard(uint index) public view returns (string memory, string memory) {
        require(index < cards.length, "Card does not exist");
        Card memory card = cards[index];
        return (card.question, card.answer);
    }
}


