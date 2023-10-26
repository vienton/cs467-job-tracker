import Error from "./Error"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default ({name, value, title, onChangeHandler, error }) => (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor={name} className="capitalize block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            {title ? title : name}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex rounded-md shadow-sm">
              {/* <input
                pattern="\d{4}-\d{2}-\d{2}"
                value={value}
                onChange={onChangeHandler}
                type="date"
                name={name}
                id={name}
                placeholder="YYYY-MM-DD"
                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
              /> */}
              <DatePicker 
                selected={value}
                onChange={date => onChangeHandler(date)}
              />
            </div>
            {error && <Error error={error} />}
          </div>
        </div>
    )