/* singleton pattern code example */
class Process {
  private constructor() {}

  public static getInstance(): Process {
    return new Process();
  }
}

class Singleton {
    private static instance: Process | null;

    private constructor() {}

    public static getInstance(): Process {
        if (!Singleton.instance) {
            Singleton.instance = Process.getInstance();
        }
        return Singleton.instance;
    }

    public static destroy(): void {
        Singleton.instance = null;
    }
    
    
}

const process = Singleton.getInstance();
const process2 = Singleton.getInstance();

console.log(process)
console.log(process2)




