declare function require(context: string): {
  (module: string): any;
  keys(): string[];
};

declare function requireContext(
  path: string,
  deep?: boolean,
  filter?: RegExp
): {
  (module: string): any;
  keys(): string[];
};
