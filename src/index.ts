/* Project Setting */
/* Create a node.js Project: npm init -y */
/* Install TypeScript: npm install -D typescript */
/* Create a File: tsconfig.json */
/* Install ts-node (Development Mode): npm install -D ts-node */
/* Install nodemon (Development Mode): npm install nodemon */
/* Install DefinitelyTyped (TS Doc): npm install -D @types/node */

import crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }

    static calculateHash(prevHash: string, height: number, data: string): string {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[];

    constructor() {
        this.blocks = [];
    }

    private getPrevHash() {
        if(this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }

    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }

    public getBlocks() {
        return [...this.blocks];
    }
}

const blockchain = new BlockChain();

blockchain.addBlock("First Block");
blockchain.addBlock("Second Block");
blockchain.addBlock("Third Block");

console.log(blockchain.getBlocks());