export default function FormExtra({ handleAdminCheck }) {
    return (
        <div className='flex items-center justify-between '>
            <div className='flex items-center'>
                <input
                    id='admin'
                    name='admin'
                    type='checkbox'
                    className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
                    onChange={(e) => handleAdminCheck(e.target.checked)}
                />
                <label
                    htmlFor='admin'
                    className='ml-2 block text-sm text-gray-900'>
                    Admin
                </label>
            </div>
        </div>
    )
}
