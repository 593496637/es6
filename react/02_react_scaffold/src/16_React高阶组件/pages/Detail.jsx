import React, { PureComponent } from 'react'
import withRenderTime from './hoc/with_render_time'

export class Detail extends PureComponent {
  render() {
    return (
      <div>Detail</div>
    )
  }
}

export default withRenderTime(Detail)