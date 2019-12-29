export default function(input, currentArgument) {
    let result;
    if (currentArgument) {
        result = currentArgument.toString() + input.toString();
    } else {
        result = input;
    }
    return result;
}
