import { RRuleSet, rrulestr } from 'rrule';

/**
 * Helper function to parse an RRule or RRuleSet string into an RRuleSet object.
 * RRule itself does not have a direct method to parse RRuleSet strings.
 *
 * @param str RRule or RRuleSet string
 * @returns the constructed RRuleSet
 */
export function parseToRRuleSet(str: string): RRuleSet {
    const setOrNot = rrulestr(str);
    if (setOrNot instanceof RRuleSet === false) {
        const rRuleSet = new RRuleSet();
        rRuleSet.rrule(setOrNot);
        return rRuleSet;
    }
    return setOrNot;
}
