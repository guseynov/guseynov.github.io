import Big from 'big.js';
export default function(firstArgument, secondArgument) {
    return new Big(firstArgument).times(secondArgument).valueOf();
}
