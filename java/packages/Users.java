package packages;
import java.io.File;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import org.w3c.dom.*;


class User {
    private int id;
    private String name;
    private String email;
    private int money;
    private int pin;

    User(

    ) {}

    public User createNewUser(String name, String email,  int money, int pin) {
        System.out.println(Database.createUniqueIdNotInBase());
        this.id = Database.createUniqueIdNotInBase();
        this.name = name;
        this.email = email;
        this.money = money;
        this.pin = pin;
        addUserToBase(this);
        System.out.println(this);
        return this;
    }

    public User getUser(String name, String email,  int money, int pin) {
        System.out.println(Database.createUniqueIdNotInBase());
        this.id = Database.createUniqueIdNotInBase();
        this.name = name;
        this.email = email;
        this.money = money;
        this.pin = pin;
        System.out.println(this);
        return this;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id, String password) {
        this.id = id;
        updateUserOnBase(this);
    }

    public int getMoney() {
        return this.money;
    }

    public void setMoney(int money) {
        this.money = money;
        updateUserOnBase(this);
    }

    public String getUserName() {
        return this.name;
    }

    public void setUserName(String name) {
        this.name = name;
        updateUserOnBase(this);
    }

    public String getUserEmail() {
        return this.email;
    }

    public void setUserEmail(String email) {
        this.email = email;
        updateUserOnBase(this);
    }

    public int getPin() {
        return this.pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
        updateUserOnBase(this);
    }

    public void addMoneyToAccount(int money){
        this.money = this.money + money;
        updateUserOnBase(this);
    }

    public int drawMoneyFromAccount(int money){
        if(this.money >= money){
            this.money = this.money - money;
            updateUserOnBase(this);
        }
        else{
            System.out.println("You don't have enough money");
        }
        return this.money;
    }

    public int showMoneyFromAccount(int pin){
        return this.money;
    }

    public String sayFullName(){
        return "My name is " + name;
    }

    public void addUserToBase(User user){
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.parse(new File("users.xml"));
            Element rootElement = doc.getDocumentElement();
            Element userElement = doc.createElement("user");
            rootElement.appendChild(userElement);
            Element idElement = doc.createElement("id");
            idElement.appendChild(doc.createTextNode(Integer.toString(user.getId())));
            userElement.appendChild(idElement);
            Element nameElement = doc.createElement("name");
            nameElement.appendChild(doc.createTextNode(user.getUserName()));
            userElement.appendChild(nameElement);
            Element emailElement = doc.createElement("email");
            emailElement.appendChild(doc.createTextNode(user.getUserEmail()));
            userElement.appendChild(emailElement);
            Element moneyElement = doc.createElement("money");
            moneyElement.appendChild(doc.createTextNode(Integer.toString(user.getMoney())));
            userElement.appendChild(moneyElement);
            Element pinElement = doc.createElement("pin");
            pinElement.appendChild(doc.createTextNode(Integer.toString(user.getPin())));
            userElement.appendChild(pinElement);
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File("users.xml"));
            transformer.transform(source, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public User updateUserOnBase(User user){
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.parse(new File("users.xml"));
            Element rootElement = doc.getDocumentElement();
            NodeList nList = doc.getElementsByTagName("user");
            for (int i = 0; i < nList.getLength(); i++) {
                Node nNode = nList.item(i);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    if (eElement.getElementsByTagName("id").item(0).getTextContent().equals(Integer.toString(user.getId()))) {
                        eElement.getElementsByTagName("name").item(0).setTextContent(user.getUserName());
                        eElement.getElementsByTagName("email").item(0).setTextContent(user.getUserEmail());
                        eElement.getElementsByTagName("money").item(0).setTextContent(Integer.toString(user.getMoney()));
                        eElement.getElementsByTagName("pin").item(0).setTextContent(Integer.toString(user.getPin()));
                    }
                }
            }
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File("users.xml"));
            transformer.transform(source, result);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return null;
    }
}
