import React from 'react'
import { render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

import Step from "./Step"

test('Step component', async () => {
  const { container } = render(
    <Step currentStep={1} title="Best way to debug code?">
      <div>
        <p>Delete it!</p>
      </div>
    </Step>
  )

  expect(container).toMatchSnapshot()
})
