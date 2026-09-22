export type InterpolationValues = Record<string, string | number>;

const TOKEN_RE = /\{([A-Za-z_][A-Za-z0-9_]*)\}/g;

/** Replace `{name}` tokens. Leave unknown tokens intact. Number values are stringified. */
export function interpolate(template: string, values: InterpolationValues): string {
  return template.replace(TOKEN_RE, (token, name: string) => {
    if (!Object.prototype.hasOwnProperty.call(values, name)) return token;
    const value = values[name];
    if (value === undefined) return token;
    return String(value);
  });
}
