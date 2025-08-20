
// We use a unique delimiter '$$$' to wrap code snippets for special formatting in the UI.
const code = (snippet: string) => `$$$${snippet}$$$`;

const rules: { [key: string]: string[] | (() => string) } = {
  greeting: ['hello', 'hi', 'hey', 'yo'],
  python: ['python', 'what is python', 'tell me about python'],
  variable: ['variable', 'variables', 'var', 'assign'],
  list: ['list', 'lists', 'array', 'arrays'],
  loop: ['loop', 'for loop', 'while loop', 'iterate'],
  function: ['function', 'functions', 'def', 'method'],
  print: ['print', 'display', 'output', 'show'],
  help: ['help', 'what can you do', 'what do you know'],
  default: () => "I'm not sure I understand. I can tell you about Python variables, lists, loops, or functions. Try asking 'What is a variable?'"
};

const responses: { [key: string]: string } = {
  greeting: "Hello there! How can I help you with Python today?",
  python: "Python is a high-level, interpreted programming language known for its readability and simplicity. It's widely used in web development, data science, AI, and more!",
  variable: `A variable in Python is a symbolic name that is a reference or pointer to an object. Once an object is assigned to a variable, you can refer to the object by that name. For example:${code('name = "Alice"\nage = 30')}`,
  list: `A list is a data structure in Python that is a mutable, or changeable, ordered sequence of elements. Lists are defined by having values between square brackets [ ]. Here's an example:${code('fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])  # Output: apple')}`,
  loop: `Loops are used to iterate over a sequence (like a list) or other iterable objects. The 'for' loop is most common. For instance:${code('for fruit in ["apple", "banana", "cherry"]:\n    print(fruit)')}This will print each fruit on a new line.`,
  function: `A function is a block of organized, reusable code that is used to perform a single, related action. Functions provide better modularity for your application. You define them using the 'def' keyword:${code('def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))')}`,
  print: `The ${code('print()')} function is used to display output to the console. It's one of the first functions you learn in Python! For example:${code('print("Hello, Python learners!")')}`,
  help: "You can ask me about fundamental Python concepts! Try questions like:\n- 'What is a variable?'\n- 'Tell me about lists'\n- 'How does a for loop work?'\n- 'How do I define a function?'"
};

export const getBotResponse = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase().trim();

  for (const key in rules) {
    if (key === 'default') continue;
    
    const keywords = rules[key] as string[];
    if (keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      return responses[key];
    }
  }

  const defaultResponse = rules.default as () => string;
  return defaultResponse();
};
