import React, { useState, useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { StyleSheet, Text, View, Alert } from "react-native";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const customDateArray = [
  "2023-07-05",
  "2023-07-10",
  "2023-07-11",
  "2023-08-15",
  "2023-08-05",
  "2023-08-10",
  "2023-08-11",
  "2023-08-15",
  "2023-09-15",
  "2023-09-05",
  "2023-09-10",
  "2023-09-11",
  "2023-09-15",
]; // Date 배열 대신 customDateArray로 이름 변경

const customDatesStyles = (date) => {
  const newDate = new Date(date);
  //console.log("월 변경", newDate.toISOString());
  const startOfMonthDate = startOfMonth(newDate);
  const endOfMonthDate = endOfMonth(newDate);
  const datesOfMonth = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });

  const customDatesStyles = datesOfMonth.map((day) => {
    const dateString = day.toISOString().slice(0, 10);
    const isInCustomDateArray = customDateArray.includes(dateString);
    const style = isInCustomDateArray
      ? {
          //backgroundColor: "#516DA4",
          borderWidth: 2,
          borderColor: "#6F94C2",
        }
      : {};

    return {
      date: day,
      style,
      textStyle: { color: "black" },
      containerStyle: [],
      allowDisabled: true,
    };
  });

  return customDatesStyles;
};

function Calendarcheck({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [customDates, setCustomDates] = useState([]);

  useEffect(() => {
    if (selectedStartDate) {
      const [year, month, day] = selectedStartDate.split("-");
      navigation.navigate("CalendarGallery", {
        year,
        month,
        day,
      });
    }
  }, [selectedStartDate, navigation]);

  const handleDatePress = (date) => {
    const dateString = date.toISOString().slice(0, 10);
    if (customDateArray.includes(dateString)) {
      setSelectedDate(dateString);
      setSelectedStartDate(dateString);
    } else {
      setSelectedDate(null);
      setSelectedStartDate(null);
      //Alert.alert("알림", "이날 등록된 사진이 없어요!");
    }
  };

  //const customDates = customDatesStyles(new Date()); // customDatesStyles()를 호출하여 배열을 얻습니다.
  const handleMonthChange = (date) => {
    const dateString = date.toISOString();
    console.log("월 변경", dateString);
    const updatedCustomDates = customDatesStyles(dateString); // 배열 얻어오기
    setCustomDates(updatedCustomDates); // 상태로 업데이트
  };

  useEffect(() => {
    // 초기에 한 번 실행
    const initialCustomDates = customDatesStyles(new Date());
    setCustomDates(initialCustomDates);
  }, []);

  return (
    <>
      <CalendarPicker
        onDateChange={handleDatePress}
        selectedStartDate={selectedStartDate}
        todayBackgroundColor="#3C4C6C"
        onMonthChange={handleMonthChange}
        todayTextStyle={{ color: "#fff" }}
        customDatesStyles={customDates}
        selectedDayColor="#6F94C2"
        weekdays={["일", "월", "화", "수", "목", "금", "토"]}
        months={[
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ]}
        previousTitle="이전"
        nextTitle="다음"
      />
    </>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default Calendarcheck;