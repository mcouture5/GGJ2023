import { ROOTS } from "./constants";
import { GameManager } from "./GameManager";

export default class WordService {

    private rootList: string[] = [...ROOTS];
    public currentRoot: string;
    
    public begin() {
        this.getNextWord();
    }

    public getNextWord() {
        // Avoids getting the same word twice in a row.
        let previousRoot = this.currentRoot;
        this.currentRoot = this.rootList.splice(Math.floor(Math.random() * this.rootList.length), 1)[0];
        previousRoot && this.rootList.push(previousRoot);
    }
    
    public testWord(prefix: string, suffix: string) {
        let word = prefix + this.currentRoot + suffix;
        console.log(word);
    }

    private success() {
        GameManager.getInstance().wordSuccess();
        this.getNextWord();
    }

    private fail() {

    }
}
