import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';

function DateSelector({ startDate, endDate, handleDateChange, showCalendar, toggleCalendar }) {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={toggleCalendar}
        className="arrow-icon"
      >
        <span>
          {startDate && endDate
            ? `${startDate.toDateString()} - ${endDate.toDateString()}`
            : startDate && endDate === null
            ? `${startDate.toDateString()} - End Date`
            : ' Date'}
        </span>
        <BiCalendar style={{ fontSize: '1.5em', marginLeft: '2px' }} />
      </div>
      {showCalendar && (
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          showPopperArrow={false}
          popperClassName="datepicker-show"
        />
      )}
    </div>
  );
}

export default DateSelector;
