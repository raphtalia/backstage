/*
 * Copyright 2023 The Backstage Authors
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
import { LogViewer } from '@backstage/core-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TaskStep } from '@backstage/plugin-scaffolder-common';
import { ScaffolderStep } from '@backstage/plugin-scaffolder-react';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LazyLog } from '@melloware/react-logviewer';
import { StatusOK } from '@backstage/core-components';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

const Accordion = withStyles({
  root: {
    margin: '0 0 12px 0',
    // boxShadow: 'none',
    // '&:not(:last-child)': {
    //   borderBottom: 0,
    // },
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
    // backgroundColor: 'rgb(0, 0, 0)',
    // borderBottom: '1px solid rgb(0, 0, 0)',
    // marginBottom: -1,
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
export const TaskLogStream = (props: {
  steps: (TaskStep & ScaffolderStep)[];
  logs: { [k: string]: string[] };
}) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      {props.steps.map(step => (
        <Accordion key={step.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <StatusOK />
            {step.name}
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              {/* {props.logs[step.id].map((line, i) => (
                <Line number={i} data={[{ text: line }]} wrapLines selectable />
              ))} */}
              <LazyLog
                // style={{ height: '23.5px', width: '23.5px' }}
                // containerStyle={{ height: '23.5px', width: '23.5px' }}
                // height={1000}
                text={props.logs[step.id].join('\n')}
                // rowHeight={19}
                // height={props.logs[step.id].length * 19}
                wrapLines
                selectableLines
              />
              hi
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};
