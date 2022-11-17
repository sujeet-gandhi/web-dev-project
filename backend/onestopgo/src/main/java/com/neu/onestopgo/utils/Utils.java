package com.neu.onestopgo.utils;

public class Utils {
    public static boolean IsNullOrEmpty(String data) {
        return data == null || data.length() == 0;
    }

    public static boolean IsNullOrEmpty(int data) {
        return data < 0;
    }

}
