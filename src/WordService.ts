import { BOTHABLES, PREFIXABLES, ROOTS, ROOT_TYPE, SUFFIXABLES, WORDS } from "./constants";
import { GameManager } from "./GameManager";
import { ITicket } from "./objects/Board";

export default class WordService {

    private prefixables: string[] = [...PREFIXABLES];
    private suffixables: string[] = [...SUFFIXABLES];
    private bothables: string[] = [...BOTHABLES];

    public currentRoot: string;
    public currentPrefixableRoot: string;
    public currentSuffixableRoot: string;
    public currentBothableRoot: string;
    private currentTicket: ITicket;
    
    public getNextRoot(ticket: ITicket) {
        this.currentTicket = ticket;
        if (ticket.type == ROOT_TYPE.PREFIXABLE) {
            this.getPrefixable();
        } else if (ticket.type == ROOT_TYPE.SUFFIXABLE) {
            this.getSuffixable();
        } else if (ticket.type == ROOT_TYPE.BOTHABLE) {
            this.getBothable();
        } 
    }

    private getPrefixable() {
        // Avoids getting the same word twice in a row.
        let previousRoot = this.currentPrefixableRoot;
        this.currentPrefixableRoot = this.prefixables.splice(Math.floor(Math.random() * this.prefixables.length), 1)[0];
        previousRoot && this.prefixables.push(previousRoot);
        this.currentRoot = this.currentPrefixableRoot;
    }
    
    private getSuffixable() {
        // Avoids getting the same word twice in a row.
        let previousRoot = this.currentSuffixableRoot;
        this.currentSuffixableRoot = this.suffixables.splice(Math.floor(Math.random() * this.suffixables.length), 1)[0];
        previousRoot && this.suffixables.push(previousRoot);
        this.currentRoot = this.currentSuffixableRoot;
    }
    
    private getBothable() {
        // Avoids getting the same word twice in a row.
        let previousRoot = this.currentBothableRoot;
        this.currentBothableRoot = this.bothables.splice(Math.floor(Math.random() * this.bothables.length), 1)[0];
        previousRoot && this.bothables.push(previousRoot);
        this.currentRoot = this.currentBothableRoot;
    }
    
    public testWord(prefix: string, suffix: string) {
        let word = prefix + this.currentRoot + suffix;
        console.log(word);
        let matchesTicket = (this.currentTicket.type === ROOT_TYPE.PREFIXABLE && (!!prefix && !suffix)) ||
            (this.currentTicket.type === ROOT_TYPE.SUFFIXABLE && (!!suffix || !prefix) || 
            (this.currentTicket.type === ROOT_TYPE.BOTHABLE && (!!prefix || !!suffix)));
        if (WORDS.indexOf(word) >= 0) {
            this.success(matchesTicket);
        } else {
            this.fail();
        }
    }

    private success(matchesTicket: boolean) {
        GameManager.getInstance().wordSuccess(matchesTicket);
    }

    private fail() {
        GameManager.getInstance().wordFail();
    }
}
