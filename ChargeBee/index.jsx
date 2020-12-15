import React, { useRef, useState } from "react"
import { CardComponent, CardCVV, CardExpiry, CardNumber } from "@chargebee/chargebee-js-react-wrapper"

// use this in the parent class

useEffect(() => {
  const chargebeeElement = document.createElement("script")
  chargebeeElement.onload = () => {
    window.Chargebee.init({
      site: "codilitysolutions-test",
      publishableKey:"test_Er41DzSUTsW126KqZEU9f2Pis3wMwdcB"
    })
    window.Chargebee.registerAgain()
  }
  chargebeeElement.setAttribute("src", "https://js.chargebee.com/v2/chargebee.js")
  document.body.appendChild(chargebeeElement)
}, [])

const ChargifyForm = () => {
	const cardRef = useRef()

	const [errors, setErrors] = useState([])

  const	options = {
		classes: {},
		style: {},
		locale: 'en',
		placeholder: {},
		fonts: []
	}

	const onReady = () => {
    console.log('card component ready')
  }

  // Method to trigger on field focus
  const onFocus = (event) => {
    console.log(event.field, 'focused')
  }

  // Method to trigger on field blur
  const onBlur = (event) => {
    console.log(event.field, 'blurred')
  }

  // Validation error handling
  const onChange = (event) => {
    
    const errors = {};
    let errorMessage = '';

    if(event.error) {
      // If error is present, setState and display the error
      errors[event.field] = event.error
      errorMessage = event.error.message
    } else {
      errors[event.field] = null
      // If there's no error, check for existing error
      const _errors = Object.values(errors).filter(val => val)
      
      // The errorObject holds a message and code
      // Custom error messages can be displayed based on the error code
      const errorObj = _errors.pop();

      // Display existing message
      if(errorObj) errorMessage = errorObj.message
      else errorMessage = ''
    }

    setErrors(errors)
  }



	const onSubmit = e => {
		if (e) e.preventDefault()
		console.log("Test", e)
		console.log(cardRef.current)
		cardRef.current
			.tokenize()
			.then(data => {
				console.log("chargebee token", data.token)
			})
			.catch(e => {
				console.log("Error", e)
			})
	}

	return (
		<>
			<form>
				<CardComponent
					ref={cardRef}
					className="fieldset field"
					onReady={onReady}
					onChange={onChange}
				>
					<CardNumber className="ex1-input" onFocus={onFocus} onBlur={onBlur} />
					<CardExpiry className="ex1-input" onFocus={onFocus} onBlur={onBlur} />
					<CardCVV className="ex1-input" onFocus={onFocus} onBlur={onBlur} />
				</CardComponent>
				<button type="submit" onClick={onSubmit}>
					Submit
				</button>
			</form>
		</>
	)
}

export default ChargifyForm
