import Big from 'big.js';
export default function(firstArgument, secondArgument) {
    return new Big(firstArgument).div(secondArgument).valueOf();
}
