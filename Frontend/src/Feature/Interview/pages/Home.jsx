import React , {useState , useRef} from 'react'
import '../style/Home.scss'
import { useInterview } from '../hooks/useinterview';
import { useNavigate } from 'react-router';


const Home = () => {

    const {loading , generateReport, reports} = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [submitError, setSubmitError] = useState("")
    const resumeInputRef = useRef();
    const navigate = useNavigate()

    const handleGenerateReport = async ()=>{
        setSubmitError("")
        const resumeFile = resumeInputRef.current?.files?.[0]

        if (!jobDescription.trim()) {
            setSubmitError("Please add the job description.")
            return
        }
        if (!resumeFile) {
            setSubmitError("Please choose your resume PDF before generating a report.")
            return
        }

        const data = await generateReport({jobDescription, selfDescription, resumeFile})
        if (data?._id) {
            navigate(`/interview/${data._id}`)
        } else {
            setSubmitError("We couldn’t generate your report. Please check your connection and try again.")
        }

    }


  return (
    <main className="interview-home">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Prepwise home">
          <span className="brand-mark">P</span>
          <span>prepwise</span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> Your next opportunity starts here</div>
      </header>

      <section className="page-intro">
        <p className="eyebrow">AI INTERVIEW PREP</p>
        <h1>Walk into your next interview <span>ready.</span></h1>
        <p className="intro-copy">Share the role and your experience. We’ll help you prepare with a personalized interview report.</p>
      </section>

      <section className="report-builder" aria-label="Interview report details">
        <article className="input-card job-card">
          <div className="card-heading">
            <div className="heading-icon job-icon" aria-hidden="true">01</div>
            <div>
              <p className="step-label">THE ROLE</p>
              <h2>Job description</h2>
            </div>
          </div>
          <p className="field-hint">Paste the job post so we can tailor your prep to what matters.</p>
          <label className="field-label" htmlFor="job-description">Job description <span>Required</span></label>
          <textarea value={jobDescription} onChange={(e)=>{setJobDescription(e.target.value)}} id="job-description" name="jobDescription" placeholder="Paste the job description here…" />
          <div className="card-footnote"><span aria-hidden="true">✦</span> Include responsibilities and skills for the best results.</div>
        </article>

        <div className="flow-connector" aria-hidden="true"><span>✦</span></div>

        <article className="input-card profile-card">
          <div className="card-heading">
            <div className="heading-icon profile-icon" aria-hidden="true">02</div>
            <div>
              <p className="step-label">YOUR STORY</p>
              <h2>Your profile</h2>
            </div>
          </div>
          <p className="field-hint">Add your resume and a little context about yourself.</p>

          <label className="field-label" htmlFor="resume">Resume <span>PDF · up to 3 MB</span></label>
          <label className="upload-area" htmlFor="resume">
            <span className="upload-icon" aria-hidden="true">↑</span>
            <span className="upload-copy"><strong>Choose a PDF to upload</strong><small>or drag and drop it here</small></span>
            <span className="browse-button">Browse</span>
            <input id="resume" name="resume" ref={resumeInputRef} type="file" accept="application/pdf,.pdf" />
          </label>

          <label className="field-label self-label" htmlFor="self-description">Tell us about yourself <span>Optional</span></label>
          <textarea value={selfDescription} onChange={(e)=>{setSelfDescription(e.target.value)}} className="self-description" id="self-description" name="selfDescription" placeholder="What are you proud of? What kind of role are you looking for?" />
        </article>
      </section>

      <div className="generate-row">
        <p><span aria-hidden="true">♧</span> Your information is only used to create your report.</p>
        <button onClick={handleGenerateReport} className="generate-button" type="button" disabled={loading}>
          {loading ? "Generating report…" : "Generate interview report"} <span aria-hidden="true">→</span>
        </button>
      </div>
      {submitError && <p className="submit-error" role="alert">{submitError}</p>}

      <section className="recent-reports" aria-labelledby="recent-reports-title">
        <div className="recent-reports-heading">
          <div>
            <p className="eyebrow">YOUR LIBRARY</p>
            <h2 id="recent-reports-title">Recent interview reports</h2>
          </div>
          <span className="report-total"><strong>{loading && reports.length === 0 ? "…" : reports.length}</strong><span>total reports</span></span>
        </div>
        {reports.length > 0 ? (
          <div className="reports-list">
            {reports.map((report) => (
              <button key={report._id} className="report-item" type="button" onClick={() => navigate(`/interview/${report._id}`)}>
                <span className="report-item-icon" aria-hidden="true">↗</span>
                <span className="report-item-copy"><strong>{report.title || report.jobDescription || "Interview report"}</strong><small>{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Generated report"}</small></span>
                <span className="report-item-score">{report.matchScore ?? "—"}<small>{report.matchScore == null ? "score" : "% match"}</small></span>
                <span className="report-item-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="reports-empty">{loading ? "Loading your saved reports…" : "Your generated reports will appear here."}</p>
        )}
      </section>
      <footer className="page-footer">Made for your next big moment.</footer>
    </main>
  )
}

export default Home
