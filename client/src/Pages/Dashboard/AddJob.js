import { Alert, Input } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import FormRowSelect from '../../components/UI/SelectInput'
const AddJob = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob
    } = useAppContext()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!position || !company || !jobLocation) {
            displayAlert()
            return
        }
        
        if(isEditing){
            return; 
        }
        createJob();
    }

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        // console.log(`${name}:${value}`)
        handleChange({ name, value });
    }

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit job' : 'add job'} </h3>
                {showAlert && <Alert />}

                {/* position */}
                <div className='form-center'>
                    <Input
                        type='text'
                        name='position'
                        value={position}
                        onChange={handleJobInput}
                    />
                    {/* company */}
                    <Input
                        type='text'
                        name='company'
                        value={company}
                        onChange={handleJobInput}
                    />
                    {/* location */}
                    <Input
                        type='text'
                        labelText='location'
                        name='jobLocation'
                        value={jobLocation}
                        onChange={handleJobInput}
                    />
                    {/* job type */}
                    <FormRowSelect
                        name="jobType"
                        labelText="type"
                        value={jobType}
                        onChange={handleJobInput}
                        list={jobTypeOptions} />
                    {/* job status */}
                    <FormRowSelect
                        name="status"
                        value={status}
                        onChange={handleJobInput}
                        list={statusOptions}
                    />
                    <div className='btn-container'>
                        <button
                            className='btn btn-block submit-btn'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob