import DatePicker from 'react-datepicker'
import Error from './Error'
import "react-datepicker/dist/react-datepicker.css";

export default ({ onChangeHandler, label, value, error }) =>  {
    return (
        <div className="bg-gray-100">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor={label} className="capitalize block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  {label}
            </label>
                <DatePicker
                        selected={value}
                        onChange={(d) => onChangeHandler(d)}
                    />
                
                {error && <Error error={error} />}
            </div>
        </div>
    )
}