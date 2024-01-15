import { Theme } from 'next-auth'
import { SendVerificationRequestParams } from 'next-auth/providers'
import { createTransport } from 'nodemailer'

export async function customSendVerificationRequest(
    params: Omit<SendVerificationRequestParams, 'expires' | 'token'>
) {
    const { identifier, url, provider, theme } = params
    const { host } = new URL(url)
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const transport = createTransport(provider.server)
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host, theme, identifier }),
    })
    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
    }
}

function html(params: {
    url: string
    host: string
    theme: Theme
    identifier: string
}) {
    const { url, host, identifier: userEmail } = params

      //由于使用
    const escapedHost = host.replace(/\./g, "&#8203;.");
    const currentYear = new Date().getFullYear()
    const brandName = 'FlowGPT'
    const magicBtnLabel = `sign in to ${brandName}`


    return `<html>
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700%display=swap" rel="stylesheet">


    <style type="text/css">
    :root {
        --invert-filter-light: 0%; /*No inversion for  light mode */
        --invert-filter-dark: 100%; /* Full inversion for dark mode */
        }

        @media (prefers-color-scheme: light) {
            img {
                filter: invert(var(--invert-filter-light));
            }
        }

        @media (prefers-color-scheme: dark) {
            img {
                filter: invert(var(--invert-filter-dark));
            }
        }
        * {
            -ms-text-size-adjust: 100%;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            mso-table-lspace: 0;
            mso-table-rspace: 0;
        }

        table td {
            border-collapse: collapse;
            padding: 0;
            line-height: 0;
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        p {
            margin: 0;
        }


        body,
        .body-table {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            background: #f6f6fa;
            font-family: 'Poppins', sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        .content-table {
            max-width: 928px;
            width: 100%;
        }

        .body {
            margin: 0;
            padding: 0 !important;
            mso-line-height-rule: exactly;
            font-weight: 400;
            font-size: 15px;
            line-height: 160%;
            color: #383c44;
        }

        .copyright {
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            font-size: 13px;
            line-height: 160%;
            color: #7b8bad;
        }

        .link-small {
            font-size: 13px;
            line-height: 19px;
            text-decoration: underline;
            color: #3c55a5;
            cursor: pointer;
        }

        .link-footer {
            font-weight: 500;
            font-size: 13px;
            line-height: 120%;
            text-decoration: none;
            color: #3c55a5;
            cursor: pointer;
        }

        .content-container {
            padding: 128px 16px 16px;
        }

        .social-container {
            padding-top: 32px;
        }

        .copyright-container {
            padding-top: 24px;
        }

        .footer-container {
            padding-top: 24px;
            padding-bottom: 16px;
        }

        .social-container td {
            padding-left: 24px;
            padding-right: 24px;
        }

        .footer-container td {
            padding-left: 12px;
            padding-right: 12px;
        }

        .order-container {
            box-sizing: border-box;
            box-shadow: 0 24px 120px rgba(60, 85, 165, 0.16);
            background: #ffffff;
            border-radius: 16px;
        }

        .greetings-container {
            padding-top: 32px;
            padding-bottom: 16px;
        }

        .text-container {
            padding: 16px 24px;
        }

        .bottom-text-container {
            padding: 16px 24px
        }

        .text-container .text {
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
            line-height: 29px;
            color: #263569;
        }

        .greeting {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 52px;
            line-height: 62px;
            letter-spacing: -0.02em;
            color: #263569;
        }

        .rounded-button {
            border-radius: 64px;
            padding: 11px 24px;
            background: #4138e5;
            color: white;
            text-decoration: none;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            font-size: 15px;
            line-height: 120%;
            letter-spacing: 0.03em;
            text-transform: uppercase;
        }

        .rounded-button a {
            color: white;
            text-decoration: none;
        }

        .infoText {
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            font-size: 13px;
            line-height: 21px;
            color: #7b8bad;
        }

        .subtitle {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 12px;
            line-height: 21px;
            color: #5d6880;
        }
    </style>

    <style type="text/css">
        .order-container {
            padding: 96px 0;
        }

        @media only screen and (min-device-width: 320px) and (max-device-width: 425px) {
            .order-container {
                padding: 56px 16px;
            }

            .greeting {
                font-size: 32px;
                line-height: 40px;
            }
        }

        .join-button {
            padding: 16px 0;
        }

        .image-container {
            width: 100%;
        }
    </style>

    <title></title>
</head>
<body>
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
    <td>
    <![endif]-->

    <div style="margin: 0 auto">
        <table border="0" cellpadding="0" cellspacing="0" class="body-table" role="“presentation”" width="100%">
			<tr>
				<td align="center" class="content-container" valign="top">
					<table border="0" cellpadding="0" cellspacing="0" class="content-table" role="“presentation”">
						<tr>
							<td class="order-container">
								<table border="0" cellpadding="0" cellspacing="0" role="“presentation”" width="100%">
									<tr>
										<td align="center" class="image-container">

                                              <img src="https://44707939.fs1.hubspotusercontent-na1.net/hubfs/44707939/flowgpt_logo.png" alt="logo" width="300px" height="47.92px" style="display: block; border: 0px; margin: 0px auto;" >

										</td>
									</tr>

									<tr>
										<td align="center" class="greetings-container">
											<span class="greeting">Let's log you in</span>
										</td>
									</tr>

									<tr>
										<td align="center" class="text-container">
											<span class="text">

                                                    Click the Button below to log in to your ${brandName} account.

                                            </span>
										</td>
									</tr>

									<tr>
										<td colspan="2">
											<table border="0" cellpadding="0" cellspacing="0" width="100%">
												<tr>
													<td align="center" class="join-button">
														<table border="0" cellpadding="0" cellspacing="0">
															<tr>
																<td class="rounded-button">



                                                                        <a href=${url} style="color: white;" target="_blank">${magicBtnLabel}</a>


																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>

									<tr>
										<td align="center" class="bottom-text-container">
											<table border="0" cellpadding="0" cellspacing="0">
												<tr>
													<td align="center">
														<span class="infoText">Confirming this request will securely log you in using</span>
													</td>
												</tr>

												<tr>
													<td align="center" style="padding-top: 8px; word-break: break-word;">

														    <span class="link-footer" href="#" style="font-family: 'Poppins', sans-serif;" target="_blank">${userEmail}</span>

                                                    </td>
												</tr>
											</table>
										</td>
									</tr>

                                    <tr>
										<td align="center" class="bottom-text-container">
											<table border="0" cellpadding="0" cellspacing="0">
												<tr>
													<td align="center">
														<span class="subtitle">if you didn't request this email, you can safely ignore it.</span>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>


<tr>
    <td align="center" class="copyright-container">
        <span class="copyright">
                Copyright ⓒ ${currentYear} ${brandName}. All rights reserved
        </span>
    </td>
</tr>


					</table>
				</td>
			</tr>
		</table>
    </div>

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
</body>
</html>`
}

// Email Text body (fallback for email clients that don't render HTML)
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}
