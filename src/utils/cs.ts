function cs(...classes: Array<string | undefined | boolean | null>): string {
  return classes.filter(Boolean).join(" ");
}

export default cs;