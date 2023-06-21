import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface QuickOptionList {
  value: string;
  minutes: number;
}

const QuickList: QuickOptionList[] = [
  { value: "1분 전", minutes: -1 },
  { value: "5분 전", minutes: -5 },
  { value: "10분 전", minutes: -10 },
  { value: "20분 전", minutes: -20 },
  { value: "30분 전", minutes: -30 },
  { value: "1분 후", minutes: 1 },
  { value: "5분 후", minutes: 5 },
  { value: "10분 후", minutes: 10 },
  { value: "20분 후", minutes: 20 },
  { value: "30분 후", minutes: 30 },
];

const QuickDatePicker = () => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const nowTime = new Date(Date.now());
  const [startDateTime, setStartDateTime] = useState<Date | null>(
    tenMinutesAgo
  );
  const [endDateTime, setEndDateTime] = useState<Date | null>(nowTime);
  const startDatePickerRef = useRef<any>(null);
  const endDatePickerRef = useRef<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleStartDateChange = (date: Date | null) => {
    setStartDateTime(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDateTime(date);
  };

  const isTimeAvailable = (time: Date) => {
    if (!startDateTime) return true;
    return time.getTime() > startDateTime.getTime();
  };

  const openStartDatePicker = () => {
    startDatePickerRef.current.setOpen(true);
  };

  const openEndDatePicker = () => {
    endDatePickerRef.current.setOpen(true);
  };

  const handleButtonClick = () => {
    setOpenModal(!openModal);
    console.log(openModal);
  };

  const handleQuickSelect = (minutes: number) => {
    const newStartDateTime = new Date(Date.now() + minutes * 60 * 1000);
    setStartDateTime(newStartDateTime);
  };

  const closeQuickModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex" }}>
        <DatePicker
          ref={startDatePickerRef}
          selected={startDateTime}
          onChange={handleStartDateChange}
          showTimeSelect
          dateFormat="yyyy.MM.dd HH:mm"
          timeFormat="HH:mm"
          //   placeholderText="시작 일시 선택하기"
        />
        <img
          src="/calender.png"
          style={{ width: 24, cursor: "pointer" }}
          onClick={openStartDatePicker}
        />
      </div>
      ~
      <div style={{ display: "flex", marginTop: 8 }}>
        <DatePicker
          ref={endDatePickerRef}
          selected={endDateTime}
          onChange={handleEndDateChange}
          showTimeSelect
          dateFormat="yyyy.MM.dd HH:mm"
          timeFormat="HH:mm"
          minDate={startDateTime || new Date()}
          filterTime={isTimeAvailable}
          //   placeholderText="종료 일시 선택하기"
        />
        <img
          src="/calender.png"
          style={{ width: 24, height: 24, cursor: "pointer" }}
          onClick={openEndDatePicker}
        />
        <button
          style={{
            width: 60,
            backgroundColor: "lightGrey",
            borderRadius: 8,
            border: "none",
            fontSize: "medium",
            fontWeight: "bold",
          }}
          onClick={handleButtonClick}
        >
          Quick
        </button>
        {/* === 모달창 === */}
        <div style={{ paddingTop: 30 }}>
          {openModal && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                minWidth: 200,
                zIndex: 10,
                boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.15)",
                padding: "16px 10px",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {QuickList.map((data) => (
                  <button
                    style={{
                      color: "grey",
                      border: "none",
                      backgroundColor: "ivory",
                      borderRadius: 10,
                      margin: "5px",
                      padding: "5px 10px",
                      fontSize: "small",
                    }}
                    key={data.value}
                    onClick={() => {
                      handleQuickSelect(data.minutes);
                      closeQuickModal();
                    }}
                  >
                    {data.value}
                  </button>
                ))}
              </div>
              <button
                style={{
                  backgroundColor: "lightGrey",
                  borderRadius: 8,
                  border: "none",
                  fontSize: "medium",
                  fontWeight: "bold",
                  padding: "5px 10px",
                  alignSelf: "flex-end",
                  marginTop: 10,
                }}
                onClick={closeQuickModal}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickDatePicker;
