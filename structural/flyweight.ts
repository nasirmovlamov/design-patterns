// The Flyweight Pattern is a structural design pattern that aims to reduce memory usage by sharing 
// common data between objects instead of duplicating them. It is particularly useful when dealing 
// with large numbers of objects that share common state, such as in graphical applications or systems with many similar objects.

// Step 1: Flyweight - TreeType class that holds shared data
class TreeType {
  constructor(
    public name: string,
    public color: string,
    public texture: string
  ) {}

  // This is the shared state (immutable for all trees of this type)
  display(): void {
    console.log(`${this.name} tree, Color: ${this.color}, Texture: ${this.texture}`);
  }
}

// Step 2: Flyweight Factory that manages shared objects
class TreeTypeFactory {
  private treeTypes: Map<string, TreeType> = new Map();

  // Check if tree type exists, if not, create and store it
  getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}_${color}_${texture}`;
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }
    return this.treeTypes.get(key)!;
  }
}

// Step 3: Context - Individual Tree instances that reference shared TreeType
class Tree {
  constructor(private treeType: TreeType, private x: number, private y: number) {}

  // This is the unique (extrinsic) state (position of the tree)
  display(): void {
    console.log(`Tree at position (${this.x}, ${this.y}):`);
    this.treeType.display();
  }
}

// Usage
const treeFactory = new TreeTypeFactory();

// Trees with the same TreeType will share the same instance of TreeType
const oakTree = treeFactory.getTreeType('Oak', 'Green', 'Rough');
const pineTree = treeFactory.getTreeType('Pine', 'Green', 'Smooth');

// Creating many trees with different positions, but reusing the same TreeType instance
const forest: Tree[] = [
  new Tree(oakTree, 10, 20),
  new Tree(oakTree, 30, 40),
  new Tree(pineTree, 50, 60),
  new Tree(pineTree, 70, 80)
];

// Displaying the details of all trees in the forest
forest.forEach(tree => tree.display());
