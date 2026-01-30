package org.example;

import java.io.FileWriter;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.File;
import java.time.Duration;
import java.util.List;
import java.util.Random;

public class Main {

    public static void main(String[] args) throws Exception {

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        Random rand = new Random();

        // STEP 1 – OPEN QUIZ
        driver.get("http://127.0.0.1:3000/index.html");
        driver.manage().window().maximize();
        driver.manage().deleteAllCookies();

        System.out.println("Landing Page Opened");
        writeLog("Landing Page Opened");
        takeScreenshot(driver, "LandingPage");
        Thread.sleep(1500);

        // STEP 2 – SELECT CATEGORY & DIFFICULTY
        Select category = new Select(wait.until(
                ExpectedConditions.elementToBeClickable(By.id("category"))));

        Select difficulty = new Select(wait.until(
                ExpectedConditions.elementToBeClickable(By.id("difficulty"))));

        List<WebElement> catOptions = category.getOptions();
        category.selectByIndex(rand.nextInt(catOptions.size()));

        List<WebElement> diffOptions = difficulty.getOptions();
        difficulty.selectByIndex(rand.nextInt(diffOptions.size()));

        System.out.println("Random Category & Difficulty Selected");
        writeLog("Category & Difficulty Selected");
        takeScreenshot(driver, "CategoryDifficultySelected");
        Thread.sleep(1500);

        // STEP 3 – CLICK START QUIZ
        wait.until(ExpectedConditions.elementToBeClickable(
                By.className("primary-btn"))).click();

        System.out.println("Quiz Started");
        writeLog("Quiz Started");
        takeScreenshot(driver, "QuizStarted");
        Thread.sleep(2000);

        // STEP 4 – ANSWER QUESTIONS
        while (true) {

            try {
                if (driver.findElement(By.id("result-screen")).isDisplayed()) {
                    System.out.println("Result page reached");
                    writeLog("Result page reached");
                    break;
                }
            } catch (Exception ignored) {}

            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("question")));

            WebElement questionText = driver.findElement(By.id("question"));
            System.out.println("Question: " + questionText.getText());
            writeLog("Question: " + questionText.getText());

            Thread.sleep(2000);

            List<WebElement> options =
                    driver.findElements(By.cssSelector("#options button"));

            options.get(rand.nextInt(options.size())).click();
            writeLog("Option Clicked");

            Thread.sleep(3000);

            try {
                WebElement nextBtn = driver.findElement(By.xpath("//button[text()='Next']"));
                if (nextBtn.isDisplayed()) {
                    nextBtn.click();
                    writeLog("Next Button Clicked");
                    Thread.sleep(2000);
                }
            } catch (Exception ignored) {}
        }

        // STEP 5 – RESULT PAGE WAIT
        WebElement score = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("score")));

        System.out.println("Final Score: " + score.getText());
        writeLog("Final Score: " + score.getText());

        WebElement analysis = driver.findElement(By.id("analysis"));
        if (analysis.isDisplayed()) {
            System.out.println("Result Analysis Displayed Successfully");
            writeLog("Result Analysis Displayed Successfully");
        }

        takeScreenshot(driver, "ResultPage");

        Thread.sleep(3000);
        writeLog("Browser Closed");
        driver.quit();
    }

    // SCREENSHOT METHOD
    public static void takeScreenshot(WebDriver driver, String name) throws Exception {
        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(src, new File("screenshots/" + name + ".png"));
    }

    // LOG METHOD
    public static void writeLog(String message) {
        try {
            FileWriter fw = new FileWriter("logs/testlog.txt", true);
            fw.write(message + "\n");
            fw.close();
        } catch (IOException e) {
            System.out.println("Log Error: " + e.getMessage());
        }
    }
}
