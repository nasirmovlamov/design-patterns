// Component Interface
interface FileSystemComponent {
  getName(): string;
  showDetails(): void;
}

// Leaf Class: File
class File implements FileSystemComponent {
  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  showDetails(): void {
    console.log(`File: ${this.getName()}`);
  }
}

// Composite Class: Folder
class Folder implements FileSystemComponent {
  private components: FileSystemComponent[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  // Add a component (file or folder) to this folder
  addComponent(component: FileSystemComponent): void {
    this.components.push(component);
  }

  // Remove a component
  removeComponent(component: FileSystemComponent): void {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  showDetails(): void {
    console.log(`Folder: ${this.getName()}`);
    // Recursively show details of all contained components (files/folders)
    this.components.forEach(component => component.showDetails());
  }
}

// Usage
const file1 = new File("File1.txt");
const file2 = new File("File2.txt");

const folder1 = new Folder("Folder1");
const folder2 = new Folder("Folder2");

folder1.addComponent(file1);
folder2.addComponent(file2);

const rootFolder = new Folder("Root");
rootFolder.addComponent(folder1);
rootFolder.addComponent(folder2);

rootFolder.showDetails();
