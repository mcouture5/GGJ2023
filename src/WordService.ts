import { BOTHABLES, PREFIXABLES, ROOTS, ROOT_TYPE, SUFFIXABLES, WORDS } from "./constants";
import { GameManager } from "./GameManager";
import { ITicket } from "./objects/Board";

export default class WordService {

    private allables: string[] = [...ROOTS];

    public currentRoot: string;
    public currentPrefixableRoot: string;
    public currentSuffixableRoot: string;
    public currentBothableRoot: string;
    private currentTicket: ITicket;
    
    public newTicket(ticket: ITicket) {
        this.currentTicket = ticket;
    }

    public getNextRoot() {
        // Avoids getting the same word twice in a row.
        let previousRoot = this.currentRoot;
        this.currentRoot = this.allables.splice(Math.floor(Math.random() * this.allables.length), 1)[0];
        previousRoot && this.allables.push(previousRoot);
    }

    public testWord(prefix: string, suffix: string) {
        let word = prefix + this.currentRoot + suffix;
        let matchesTicket = !!this.currentTicket && ((this.currentTicket.type === ROOT_TYPE.PREFIXABLE && (!!prefix && !suffix)) ||
            (this.currentTicket.type === ROOT_TYPE.SUFFIXABLE && (!!suffix && !prefix) || 
            (this.currentTicket.type === ROOT_TYPE.BOTHABLE && (!!prefix && !!suffix))));
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
