import React from "react";

export default function LocationForm({
  formAnswers,
  handleChange,
  handleSubmit,
}) {
  // console.log(formAnswers);
  return (
    <div>
      <form
        action="/hotel"
        onSubmit={() => {
          console.log(formAnswers);
          handleSubmit(formAnswers.city);
        }}
      >
        <input
          value={formAnswers.city}
          className="city"
          name="city"
          onChange={handleChange}
          type="text"
          placeholder="Where Would You Like To Go?"
        ></input>
        <div>
          <label for="guests">How Many Guests?</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            value={formAnswers.guests}
            className="guests"
            name="guests"
          ></input>
        </div>
        <div>
          <label for="date">When Would You Like To Travel?</label>
          <br />
          <input
            type="date"
            onChange={handleChange}
            value={formAnswers.startDate}
            className="startDate"
            name="startDate"
          ></input>
          <input
            type="date"
            className="endDate"
            name="endDate"
            onChange={handleChange}
            value={formAnswers.endDate}
          ></input>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <form>
        <h1>{formAnswers === undefined ? formAnswers : null}</h1>
      </form>
    </div>
  );
}
