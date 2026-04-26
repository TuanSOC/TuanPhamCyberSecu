import { commandCenter } from "../data/portfolio";
import { Card, Section } from "./Primitives";
import { Icon } from "./icons";

function SeverityBadge({ severity }) {
  return <span className={`severity-badge severity-badge--${severity.toLowerCase()}`}>{severity}</span>;
}

export function CommandCenter() {
  return (
    <Section
      id="command-center"
      title={commandCenter.title}
      eyebrow={commandCenter.eyebrow}
      intro={commandCenter.intro}
      className="section--command-center"
    >
      <div className="command-center-grid">
        <Card className="command-panel command-panel--overview" delay={40}>
          <div className="command-panel__header">
            <div>
              <p className="command-panel__eyebrow">Telemetry Overview</p>
              <h3>Signal pipeline</h3>
            </div>
            <span className="command-live-dot">Standby</span>
          </div>
          <div className="telemetry-grid">
            {commandCenter.telemetry.map((item) => (
              <div className="telemetry-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.trend}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card className="command-panel command-panel--queue" delay={110}>
          <div className="command-panel__header">
            <div>
              <p className="command-panel__eyebrow">Alert Queue</p>
              <h3>Practice scenarios</h3>
            </div>
            <Icon name="Activity" className="size-5 text-blue-300" />
          </div>
          <div className="alert-queue">
            {commandCenter.alertQueue.map((alert) => (
              <article className="alert-card" key={alert.title}>
                <div className="alert-card__top">
                  <SeverityBadge severity={alert.severity} />
                  <span>{alert.source}</span>
                </div>
                <h4>{alert.title}</h4>
                <p>{alert.action}</p>
                <small>{alert.status}</small>
              </article>
            ))}
          </div>
        </Card>

        <Card className="command-panel command-panel--workflow" delay={180}>
          <div className="command-panel__header">
            <div>
              <p className="command-panel__eyebrow">Analyst Workflow</p>
              <h3>How I move from alert to handoff</h3>
            </div>
            <Icon name="Shield" className="size-5 text-blue-300" />
          </div>
          <div className="workflow-pipeline">
            {commandCenter.workflow.map((step) => (
              <article className="workflow-step" key={step.step}>
                <span>{step.step}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="command-panel command-panel--model" delay={230}>
          <div className="command-panel__header">
            <div>
              <p className="command-panel__eyebrow">Operating Model</p>
              <h3>Detection to handoff framework</h3>
            </div>
            <Icon name="Cpu" className="size-5 text-blue-300" />
          </div>
          <div className="operating-model">
            {commandCenter.operatingModel.map((item, index) => (
              <article className="operating-model__item" key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                  <small>{item.metric}</small>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="command-panel command-panel--matrix" delay={280}>
          <div className="command-panel__header">
            <div>
              <p className="command-panel__eyebrow">Capability Matrix</p>
              <h3>Where the lab maps to SOC work</h3>
            </div>
            <Icon name="Globe" className="size-5 text-blue-300" />
          </div>
          <div className="capability-matrix">
            {commandCenter.capabilityMatrix.map((item) => (
              <div className="capability-row" key={item.area}>
                <span>{item.area}</span>
                <strong>{item.level}</strong>
                <small>{item.detail}</small>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
