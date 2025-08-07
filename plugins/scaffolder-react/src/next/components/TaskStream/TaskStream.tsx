/*
 * Copyright 2025 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TaskStep } from '@backstage/plugin-scaffolder-common';
import { ScaffolderStep } from '@backstage/plugin-scaffolder-react';
import Box from '@material-ui/core/Box';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DateTime, Interval } from 'luxon';
import humanizeDuration from 'humanize-duration';
import { Line } from '@melloware/react-logviewer';
import { StepIcon } from './StepIcon';
import { ansiparse } from './ansiparse';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  log: {
    background: theme.palette.background.default,
    width: '100%',
  },
  duration: {
    color: theme.palette.text.secondary,
  },
}));

const Accordion = withStyles({
  root: {
    margin: '0 0 12px 0',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

/**
 * The text of the event stream
 *
 * @alpha
 */
export const TaskStream = (props: {
  steps: (TaskStep & ScaffolderStep)[];
  logs: { [k: string]: string[] };
}) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      {props.steps.map(step => {
        // const isCompleted = step.status === 'completed';
        //             const isFailed = step.status === 'failed';
        //             const isActive = step.status === 'processing';
        //             const isSkipped = step.status === 'skipped';

        return (
          <Accordion key={step.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              disabled={['cancelled', 'open', 'skipped'].includes(step.status)}
            >
              <StepIcon status={step.status} />
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{step.name}</Typography>
                <Typography variant="caption" className={styles.duration}>
                  {step.endedAt
                    ? humanizeDuration(
                        Interval.fromDateTimes(
                          DateTime.fromISO(step.startedAt!),
                          DateTime.fromISO(step.endedAt),
                        )
                          .toDuration()
                          .valueOf(),
                        { round: true },
                      )
                    : step.status}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.log}>
                {props.logs[step.id].map((line, i) => (
                  <Line
                    number={i}
                    data={ansiparse(line)}
                    enableLinks
                    wrapLines
                    selectable
                  />
                ))}
              </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button size="small">View Input</Button>
            </AccordionActions>
          </Accordion>
        );
      })}
    </div>
  );
};
