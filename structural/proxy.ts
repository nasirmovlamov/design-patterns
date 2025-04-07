// The Proxy Pattern is a structural design pattern that provides an object representing another object. 
// The proxy object controls access to the original object, and can be used for purposes such 
// as lazy initialization, access control, logging, monitoring, or modification of requests and responses.

// RealSubject: The real object representing the document
class Document {
  public view(): string {
    return "Viewing the document content.";
  }
}

// Proxy: Controls access to the document
class DocumentProxy {
  private document: Document | null = null;

  constructor(private userRole: string) {}

  // The view method is controlled by the proxy
  public view(): string {
    // If the user is an admin, they can view the document
    if (this.userRole === "admin") {
      if (!this.document) {
        console.log("Proxy: Creating the document for the admin.");
        this.document = new Document();
      }
      console.log("Proxy: Forwarding request to the document.");
      return this.document.view();
    } else {
      // If the user is not an admin, they are not allowed to view the document
      return "Access denied. You must be an admin to view this document.";
    }
  }
}

// Simulating users with different roles
const adminProxy = new DocumentProxy("admin");
const userProxy = new DocumentProxy("user");

console.log(adminProxy.view());  // Admin tries to view the document
console.log(userProxy.view());   // Regular user tries to view the document
