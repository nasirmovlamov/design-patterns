package packages;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import org.xml.sax.*;
import org.w3c.dom.*;
import java.io.*;
import java.util.*;
import java.util.Scanner;
import java.util.regex.*;
import packages.User;

class ATM {
    User active_user;

    ATM() {
        atmOn();
    }

    void clearTerminal(){
        
    }

    public ATM atmOn(){
        while(true){
            Scanner operation = new Scanner(System.in);
            System.out.println("Welcome to ATM");
            System.out.println("1. Login");
            System.out.println("2. Create account");
            System.out.println("3. Exit");
            int choice = operation.nextInt();

            switch(choice){
                case 1:
                    login();
                    break;
                case 2:
                    createAccount();
                    break;
                case 3:
                    System.out.println("Bye");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Wrong choice");
                    break;
            }

            ATM atm = new ATM();
            return atm;
        }   
    }

    void showMenu() {
        System.out.println("1. Show balance");
        System.out.println("2. Withdraw");
        System.out.println("3. Deposit");
        System.out.println("4. Exit");
    }

    void login(){
        Scanner operation = new Scanner(System.in);
        System.out.println("Please enter your pin");
        int pin = operation.nextInt();
        this.active_user = Database.getUserFromBase(pin);
        if (this.active_user == null) {
            System.out.println("Wrong pin");
            return;
        }
        showMenu();

        switch (operation.nextInt()) {
            case 1 :
                showBalance();
                break;
            case 2 :
                withdrawMoney();
                break;
            case 3 :
                depositMoney();
                break;
            case 4 :
                System.exit(0);
                break;
            default:
                break;
        }
    }

    void createAccount(){
        Scanner operation = new Scanner(System.in);
        System.out.println("Please enter your name");
        String name = operation.nextLine();
        System.out.println("Please enter your email");
        String email = operation.nextLine();
        System.out.println("Please enter your pin");
        int pin = operation.nextInt();
        System.out.println("Please enter your money");
        int money = operation.nextInt();
        User user = new User().createNewUser(name, email, money, pin);
        System.out.println("Account created");
        login();
    }

    void withdrawMoney() {
        Scanner operation = new Scanner(System.in);
        System.out.println("Enter amount of money to withdraw");
        int amount = operation.nextInt();
        if (amount > this.active_user.getMoney()) {
            System.out.println("You don't have enough money");
            return;
        }
        this.active_user.drawMoneyFromAccount(amount);
    }

    void depositMoney() {
        Scanner operation = new Scanner(System.in);
        System.out.println("Enter amount of money to deposit");
        int amount = operation.nextInt();
        this.active_user.addMoneyToAccount(amount);
    }

    void showBalance() {
        System.out.println("Your balance is " + this.active_user.getMoney());
    }

    public void openAccount(String name, String email,  int money , int pin) {
        User newUser = new User();
        newUser.createNewUser(name, email,  money, pin);
        newUser.addUserToBase(newUser);
    }

    public void closeAccount(int id, int pin) {
        if (Database.checkUserWithPin(pin)) {
            
        }
    }

}