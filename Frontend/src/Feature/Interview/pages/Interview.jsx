import React, { useState , useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useinterview'
import { useNavigate , useParams } from 'react-router'

const sections = [
  { id: 'technical', number: '01', label: 'Technical questions', icon: '⌘' },
  { id: 'behavioral', number: '02', label: 'Behavioral questions', icon: '◉' },
  { id: 'roadmap', number: '03', label: 'Preparation roadmap', icon: '↗' },
]

const Interview = () => {
  const { report, loading , getReportById } = useInterview()
  const [activeSection, setActiveSection] = useState('technical')
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  if (loading) {
    return <main className={`interview-report ${isDarkTheme ? 'dark-theme' : ''}`}><div className="report-state"><span className="report-state-spinner" /><h1>Loading your interview report</h1><p>We’re getting your personalized preparation ready.</p></div></main>
  }
  if (!report) {
    return <main className={`interview-report ${isDarkTheme ? 'dark-theme' : ''}`}><div className="report-state"><span className="report-state-icon">!</span><h1>Report unavailable</h1><p>We couldn’t find an interview report for this link. Check the report ID and try again.</p><a href="/">Back to home</a></div></main>
  }
  const matchScore = report?.matchScore ?? 0
  const technicalQuestions = report?.technicalQuestions ?? []
  const behavioralQuestions = report?.behavioralQuestions ?? []
  const skillGaps = report?.skillGaps ?? []
  const preparationPlan = report?.preparationPlan ?? []
  const activeMeta = sections.find((section) => section.id === activeSection)

  return (
    <main className={`interview-report ${isDarkTheme ? 'dark-theme' : ''}`}>
      <header className="report-topbar">
        <a className="report-brand" href="/" aria-label="Prepwise home"><span className="report-brand-mark">P</span><span>prepwise</span></a>
        <div className="report-topbar-right"><span className="report-ready"><i /> Your report is ready</span><button className="theme-toggle" type="button" aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`} aria-pressed={isDarkTheme} onClick={() => setIsDarkTheme((currentTheme) => !currentTheme)}><span aria-hidden="true">{isDarkTheme ? '☀' : '☾'}</span><span className="theme-toggle-label">{isDarkTheme ? 'Light mode' : 'Dark mode'}</span></button><span className="report-avatar">R</span></div>
      </header>

      <div className="report-layout">
        <aside className="report-nav">
          <p className="rail-label">YOUR REPORT</p>
          <div className="report-tabs" role="tablist" aria-label="Interview report sections" aria-orientation="vertical">
            {sections.map((section) => (
              <button className={`rail-link ${activeSection === section.id ? 'active' : ''}`} id={`tab-${section.id}`} key={section.id} type="button" role="tab" aria-selected={activeSection === section.id} aria-controls={`panel-${section.id}`} onClick={() => setActiveSection(section.id)}>
                <span className="nav-icon" aria-hidden="true">{section.icon}</span><span className="nav-copy"><small>{section.number}</small>{section.label}</span><span className="nav-arrow" aria-hidden="true">›</span>
              </button>
            ))}
          </div>
          <div className="rail-note"><span>✦</span><p>Your personalized guide is ready. Take it one step at a time.</p></div>
        </aside>

        <section className="report-content" role="tabpanel" id={`panel-${activeSection}`} aria-labelledby={`tab-${activeSection}`}>
          <div className="report-heading">
            <div className="report-heading-icon" aria-hidden="true">{activeMeta?.icon}</div>
            <div>
              <p className="report-kicker">INTERVIEW PREPARATION <span>·</span> {activeMeta?.number}</p>
              <h1>{activeSection === 'roadmap' ? 'Your preparation roadmap' : activeSection === 'behavioral' ? 'Behavioral questions' : 'Technical questions'}</h1>
              <p className="report-subtitle">{activeSection === 'roadmap' ? 'A simple, focused plan to help you prepare with confidence.' : activeSection === 'behavioral' ? 'Practice sharing the experiences that show how you work.' : `Practice questions tailored to your ${report?.title || 'target'} role.`}</p>
            </div>
          </div>

          {activeSection === 'technical' && (
            <div className="section-panel">
              <div className="panel-intro"><div><span className="panel-overline">PRACTICE SET</span><h2>Build confidence, one answer at a time</h2></div><span className="count-pill">{technicalQuestions.length} questions</span></div>
              <div className="question-list">
                {technicalQuestions.map((item, index) => (
                  <details className="question-card" key={`technical-${index}`} open={index === 0}>
                    <summary><span className="question-number">{String(index + 1).padStart(2, '0')}</span><span className="question-title">{item.question}</span><span className="chevron" aria-hidden="true">⌄</span></summary>
                    <div className="question-detail"><div><p className="detail-label">WHAT THEY’RE LOOKING FOR</p><p>{item.intention}</p></div><div><p className="detail-label">HOW TO APPROACH IT</p><p>{item.answer}</p></div></div>
                  </details>
                ))}
                {!technicalQuestions.length && <p className="empty-state">No technical questions are available in this report.</p>}
              </div>
              <div className="practice-tip"><span>✦</span><p><strong>Practice out loud.</strong> Explain your thinking clearly, as if you were talking to your interviewer.</p></div>
            </div>
          )}

          {activeSection === 'behavioral' && (
            <div className="section-panel">
              <div className="panel-intro"><div><span className="panel-overline">YOUR STORIES</span><h2>Make your experience memorable</h2></div><span className="count-pill">{behavioralQuestions.length} questions</span></div>
              <div className="question-list">
                {behavioralQuestions.map((item, index) => (
                  <details className="question-card" key={`behavioral-${index}`} open={index === 0}>
                    <summary><span className="question-number violet-number">{String(index + 1).padStart(2, '0')}</span><span className="question-title">{item.question}</span><span className="chevron" aria-hidden="true">⌄</span></summary>
                    <div className="question-detail"><div><p className="detail-label">WHAT THEY’RE LOOKING FOR</p><p>{item.intention}</p></div><div><p className="detail-label">HOW TO APPROACH IT</p><p>{item.answer}</p></div></div>
                  </details>
                ))}
                {!behavioralQuestions.length && <p className="empty-state">No behavioral questions are available in this report.</p>}
              </div>
              <div className="practice-tip violet-tip"><span>✦</span><p><strong>Try the STAR method.</strong> Set the scene, explain your role, share your actions, and finish with the result.</p></div>
            </div>
          )}

          {activeSection === 'roadmap' && (
            <div className="section-panel">
              <div className="panel-intro"><div><span className="panel-overline">YOUR NEXT STEPS</span><h2>Small steps make a strong interview</h2></div><span className="count-pill">{preparationPlan.length} days</span></div>
              <div className="roadmap-list">
                {preparationPlan.map((day) => (
                  <article className="roadmap-day" key={day._id || day.day}>
                    <div className="day-marker"><span>DAY</span><strong>{day.day}</strong></div>
                    <div className="day-content"><h3>{day.focus}</h3><ul>{(day.tasks || []).map((task, index) => <li key={index}>{task}</li>)}</ul></div>
                  </article>
                ))}
                {!preparationPlan.length && <p className="empty-state">No preparation plan is available in this report.</p>}
              </div>
            </div>
          )}
        </section>

        <aside className="report-insights" aria-label="Report summary">
          <section className="insight-card score-card">
            <p className="rail-label">YOUR ROLE MATCH</p>
            <div className="score-ring" style={{ '--score': `${matchScore}%` }}><div><strong>{matchScore}</strong><span>out of 100</span></div></div>
            <p className="score-caption">{matchScore >= 80 ? 'Excellent alignment' : matchScore >= 60 ? 'Strong potential' : 'Room to grow'}</p>
            <p className="score-description">for {report?.title || 'this role'}</p>
          </section>
          <section className="insight-card gaps-card">
            <div className="insight-title"><p className="rail-label">SKILLS TO BUILD</p><span>{skillGaps.length}</span></div>
            <p className="insight-hint">Focus areas to strengthen</p>
            <ul className="skill-list">{skillGaps.map((gap, index) => <li className={`skill-chip severity-${gap.severity}`} key={`${gap.skill}-${index}`}><span className="severity-dot" />{gap.skill}<small>{gap.severity}</small></li>)}</ul>
            {!skillGaps.length && <p className="empty-insight">No skill gaps were identified.</p>}
          </section>
          <div className="insight-tip"><span>✦</span><p><strong>You’ve got this.</strong> A little focused practice goes a long way.</p></div>
        </aside>
      </div>
    </main>
  )
}

export default Interview
