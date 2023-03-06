import { useRef } from "react";

type SearchBoxProps = {
  findEventHandler: (selectedYear: string, selectedMonth: string) => void;
};

export default function SearchBox({ findEventHandler }: SearchBoxProps) {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const selectedYear = yearInputRef!.current!.value;
    const selectedMonth = monthInputRef!.current!.value;
    findEventHandler(selectedYear, selectedMonth);
  };

  return (
    <form onSubmit={(e) => onSubmitHandler(e)}>
      <div>
        <label htmlFor="year">Year</label>
        <select id="year" ref={yearInputRef}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div>
        <label htmlFor="month">Month</label>
        <select id="month" ref={monthInputRef}>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </div>
      <button type="submit">Find Events</button>
    </form>
  );
}
