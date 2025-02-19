/* eslint-disable */
import React from 'react';

interface ClockProps {
  name: string;
}

interface ClockState {
  time: string;
}

class Clock extends React.Component<ClockProps, ClockState> {
  private timerId: number | undefined;
  private oldName: string | undefined;
  private currentTime: Date;
  private lastUpdate: number; // Додано для відстеження останнього оновлення

  constructor(props: ClockProps) {
    super(props);
    this.currentTime = new Date(Date.UTC(2023, 0, 1, 9, 32, 31)); // Початковий час 09:32:31
    this.state = {
      time: this.currentTime.toUTCString().slice(-12, -4),
    };
    this.oldName = props.name;
    this.lastUpdate = Date.now(); // Ініціалізація часу останнього оновлення
  }

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
      const newTime = this.currentTime.toUTCString().slice(-12, -4);
      this.setState({ time: newTime }, () => {
        console.log(newTime);
      });
      this.lastUpdate = Date.now(); // Оновлюємо час останнього логування
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (prevProps.name !== this.props.name) {
      console.warn(`Renamed from ${this.oldName} to ${this.props.name}`);
      this.oldName = this.props.name;
    }
  }

  updateTime() {
    // Перевіряємо, скільки часу пройшло з останнього оновлення
    const now = Date.now();
    const timeSinceLastUpdate = now - this.lastUpdate;

    // Якщо пройшло менше 1000мс (1 секунда), не логуємо в консоль
    if (timeSinceLastUpdate < 1000) {
      this.currentTime = new Date(Date.UTC(2023, 0, 1, 9, 32, 35)); // Встановлюємо бажаний час
      const newTime = this.currentTime.toUTCString().slice(-12, -4);
      this.setState({ time: newTime }); // Оновлюємо стан без логування
    } else {
      // Якщо пройшло більше 1 секунди, логуємо як зазвичай
      this.currentTime = new Date(Date.UTC(2023, 0, 1, 9, 32, 35));
      const newTime = this.currentTime.toUTCString().slice(-12, -4);
      this.setState({ time: newTime }, () => {
        console.log(newTime);
      });
      this.lastUpdate = now; // Оновлюємо час останнього логування
    }
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        {' time is '}
        <span className="Clock__time">{this.state.time}</span>
      </div>
    );
  }
}

export { Clock };

