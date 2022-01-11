export default function handleError(e: unknown) {
  if (e instanceof RangeError) {
    return `Range error: ${e.message}`;
  } if (e instanceof TypeError) {
    return `Type Error: ${e.message}`;
  } if (e instanceof ReferenceError) {
    return `Reference Error: ${e.message}`;
  } if (e instanceof SyntaxError) {
    return `Syntax Error: ${e.message}`;
  } if (e instanceof URIError) {
    return `URI Error: ${e.message}`;
  } if (e instanceof EvalError) {
    return `Eval Error: ${e.message}`;
  }
  return String(e);
}
