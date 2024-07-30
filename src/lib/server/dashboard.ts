import { User_Model } from "./models";
import axios from 'axios';

class Node {
    data: any;
    left: Node | null;
    right: Node | null;

    constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    insert(data: any) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node: Node, newNode: Node) {
        if (new Date(newNode.data.createdAt) < new Date(node.data.createdAt)) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    getOldPasswords(node: Node | null, thresholdDate: Date, oldPasswords: any[]) {
        if (node !== null) {
            this.getOldPasswords(node.left, thresholdDate, oldPasswords);
            if (new Date(node.data.createdAt) < thresholdDate) {
                oldPasswords.push(node.data);
            }
            this.getOldPasswords(node.right, thresholdDate, oldPasswords);
        }
    }
}


export async function dateChecker(userTag: string): Promise<any> {
    try {
        const user = await User_Model.findOne({ userTag });
        if (!user) {
            return { error: "User not found" };
        }

        const savedPasswords = user.savedPasswords;
        const now = new Date();
        const thresholdDate = new Date(now.setDate(now.getDate() - 3)); // set this threshold to whatev

        const bst = new BinarySearchTree();

        savedPasswords.forEach(passwordEntry => {
            bst.insert(passwordEntry);
        });

        const oldPasswords: any[] = [];
        bst.getOldPasswords(bst.root, thresholdDate, oldPasswords);
        return oldPasswords;
    } catch (error) {
        return { error };
    }
}

export async function breachCheck(email: string): Promise<any> {
    const apiUrl = `https://leakcheck.io/api/public?check=` + email;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from LeakCheck API:', error);
        throw new Error('Failed to fetch data from LeakCheck API');
    }
}