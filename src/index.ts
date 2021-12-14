import * as CryptoJS from "crypto-js";

class Block {
   public index:number;
   public hash:string;
   public previousHash:string;
   public data:string;
   public timeStamp:number;
   
   constructor(index:number, hash:string, previousHash:string, data:string, timeStamp:number) {
      this.index = index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timeStamp = timeStamp;
   }

   static calculateBlockHash = (index:number, previousHash:string, timeStamp:number, data:string):string => {
      return CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();
   }

   static isValidStructure = (b:Block):boolean => {
      return (typeof b.index === "number" &&
      typeof b.hash === "string" &&
      typeof b.previousHash === "string" &&
      typeof b.data === "string" &&
      typeof b.timeStamp === "number") ? true : false;
   }
}

// this will be the first block of blockchain.
const genesisBlock:Block = new Block(0, "391203933", "", "this is first block", 0);

// make blockchain. [Block]means array of Block. put the first Block to array of Block that is genesisBlock.
let blockchain:Block[] = [genesisBlock];

const getBlockChain = ():Block[] => {
   return blockchain;
}

const getLastBlock = ():Block => {
   return blockchain[blockchain.length-1];
}

const getNewTimeStamp = ():number => Math.round(new Date().getTime() / 1000);

// function that creates new block
const createNewBlock = (data:string):Block => {
   const previousBlock:Block = getLastBlock();
   const newIndex:number = previousBlock.index + 1;
   const newTimeStamp:number = getNewTimeStamp();
   const newHash:string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
   const newBlock:Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
   addBlock(newBlock);
   return newBlock;
}

const getHash = (b:Block):string => {
   return Block.calculateBlockHash(b.index, b.previousHash, b.timeStamp, b.data);
}

const isValid = (candidateBlock:Block, previousBlock:Block):boolean => {
   if(!Block.isValidStructure(candidateBlock)) {
      return false;
   } else if(previousBlock.index + 1 !== candidateBlock.index) {
      return false;
   } else if(previousBlock.hash !== candidateBlock.previousHash) {
      return false;
   } else if(getHash(candidateBlock) !== candidateBlock.hash) {
      return false;
   } else {
      return true;
   }
}

const addBlock = (candidateBlock:Block):void => {
   if(isValid(candidateBlock, getLastBlock())) {
      blockchain.push(candidateBlock);
   }
}

createNewBlock("Hello, second Block");
createNewBlock("haha, third Block");
createNewBlock("yeah, last Block");

console.log(blockchain);

export {};
