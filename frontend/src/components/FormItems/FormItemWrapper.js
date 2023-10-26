export default ({ title, name, value, formItem }) => (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
  <label htmlFor={name} className="capitalize block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
    {title ? title : name}
  </label>
  <div className="mt-1 sm:mt-0 sm:col-span-2">
    {formItem}
  </div>
</div>
)