package packages;
import java.io.File;
import java.lang.management.ClassLoadingMXBean;

import javax.lang.model.type.UnionType;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import org.xml.sax.*;

import netscape.javascript.JSObject;

import org.w3c.dom.*;
import java.util.*;


public class Database {

    public static Boolean checkUserPasswordOnBase(int id, String password){        
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse("users.xml");
            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("user");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    if (eElement.getAttribute("id").equals(id)) {
                        if (eElement.getAttribute("password").equals(password)) {
                            return true;
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

    public static User getUserFromBase(int pin){
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.parse(new File("users.xml"));
            Element rootElement = doc.getDocumentElement();
            NodeList nList = rootElement.getElementsByTagName("user");

            System.out.println();
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Element xmlElement = (Element)nList.item(temp);
                System.out.println(xmlElement.getElementsByTagName("id").item(0).getTextContent());
                System.out.println(xmlElement.getElementsByTagName("name").item(0).getTextContent());
                System.out.println(xmlElement.getElementsByTagName("email").item(0).getTextContent());
                System.out.println(xmlElement.getElementsByTagName("pin").item(0).getTextContent());
                System.out.println(xmlElement.getElementsByTagName("money").item(0).getTextContent());
                if (xmlElement.getElementsByTagName("pin").item(0).getTextContent().equals(Integer.toString(pin))) {
                    return new User().getUser(
                        xmlElement.getElementsByTagName("name").item(0).getTextContent(),
                        xmlElement.getElementsByTagName("email").item(0).getTextContent(),
                        Integer.parseInt(xmlElement.getElementsByTagName("money").item(0).getTextContent()), 
                        Integer.parseInt(xmlElement.getElementsByTagName("pin").item(0).getTextContent())
                    );
                }else{
                    return null;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return null;
    }

    public static int  createUniqueIdNotInBase(){
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse("users.xml");
            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("user");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                return temp + 1;
            }
        } catch (Exception e) {
        }
        return (int) Math.random() * 100;
    }

    public static Boolean checkUserWithPin(int pin){
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse("users.xml");
            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("user");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    if (eElement.getAttribute("pin").equals(pin)) {
                        return true;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

    public static void removeUser(int pin){
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse("users.xml");
            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("user");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    if (eElement.getAttribute("pin").equals(pin)) {
                        doc.getElementsByTagName("users").item(0).removeChild(nNode);
                        TransformerFactory transformerFactory = TransformerFactory.newInstance();
                        Transformer transformer = transformerFactory.newTransformer();
                        DOMSource source = new DOMSource(doc);
                        StreamResult result = new StreamResult(new File("users.xml"));
                        transformer.transform(source, result);
                        return;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
