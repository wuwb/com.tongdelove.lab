import { Injectable } from '@nestjs/common'
import https from 'https'
import fs from 'fs'

@Injectable()
export class ChatService {
  private client: ClientProxy

  constructor() {}

  // https://www.lepton.ai/playground/sdxl?model=open-dalle
  generateLeptonImage() {
    const LEPTON_API_TOKEN = 'e3is0bssxn38sq9szero28k23qhecinb' // process.env.LEPTON_API_TOKEN

    const data = JSON.stringify({
      width: 1024,
      height: 1024,
      guidance_scale: 7.5,
      high_noise_frac: 0.75,
      seed: 151886915,
      steps: 35,
      use_refiner: false,
      scheduler: 'KDPM2Discret',
      prompt: 'Astronaut on Mars During sunset',
    })

    const options = {
      hostname: 'open-dalle.lepton.run',
      path: '/run',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        Authorization: `Bearer ${LEPTON_API_TOKEN}`,
      },
    }

    const req = https.request(options, (res) => {
      const file = fs.createWriteStream('output_image.png')
      res.pipe(file)
    })
    req.on('error', (error) => {
      console.error(error)
    })
    req.write(data)
    req.end()
  }
}
