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
}

// this will be the first block of blockchain.
const genesisBlock:Block = new Block(1, "391203933", "", "Hello", 123);

// make blockchain. [Block]means array of Block. put the first Block to array of Block that is genesisBlock.
let blockchain:[Block] = [genesisBlock];

console.log(blockchain);

export {};