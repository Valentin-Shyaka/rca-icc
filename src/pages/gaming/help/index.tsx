import GamingLayout from '@/layouts/GamingLayout';
import React from 'react';
import { List } from '@mantine/core';

import { Table, ScrollArea } from '@mantine/core';

import { Container, Title, Accordion } from '@mantine/core';

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

const index = () => {
  const data = [
    {
      action: 'Man of The Match',
      bonusPoint: 10,
    },
    {
      action: 'First Team to Score (Football)',
      bonusPoint: 5,
    },
    {
      action: 'Away score ',
      bonusPoint: 5,
    },
    {
      action: 'Home score',
      bonusPoint: 5,
    },
    {
      action: 'Highest scoring player (Basketball)',
      bonusPoint: 10,
    },
    {
      action: 'Match Winner Prediction',
      bonusPoint: 5,
    },
  ];

  const rows = data.map((row) => (
    <Table.Tr key={row.action}>
      <Table.Td>{row.action}</Table.Td>
      <Table.Td>{row.bonusPoint}</Table.Td>
    </Table.Tr>
  ));
  return (
    <GamingLayout title="Fantasy - Help" isGeneral>
      <div className="p-6">
        <h1 className="font-bold text-3xl">Help</h1>
        <Container size="sm" className="">
          <Title ta="center" className="">
            FAQs
          </Title>

          <Accordion variant="separated" className="mt-4">
            <Accordion.Item className="" value="reset-password">
              <Accordion.Control>Score allocation</Accordion.Control>
              <Accordion.Panel>
                <ScrollArea h={200}>
                  <Table miw={600}>
                    <Table.Thead className="">
                      <Table.Tr>
                        <Table.Th>Action</Table.Th>
                        <Table.Th>Points</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </ScrollArea>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className="" value="another-account">
              <Accordion.Control>Rules</Accordion.Control>
              <Accordion.Panel>
                <List type="ordered" withPadding listStyleType="disc">
                  <List.Item>
                    First Login using your <span className="font-bold">RCA-MIS</span> credentials for identification
                  </List.Item>
                  <List.Item>
                    You can check your ranking on the ICC predictor by checking the{' '}
                    <span className="font-bold">Standings</span> page on your sidebar
                  </List.Item>
                  <List.Item>You are allowed to update your prediction once the match has not started yet</List.Item>
                  <List.Item>No predictions will be made once the match has started</List.Item>
                </List>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className="" value="another-account">
              <Accordion.Control>Awards</Accordion.Control>
              <Accordion.Panel>
                At the end of the 2024 ICC the winner of the ICC predictor will be awarded in the closing ceremony, and
                will be called upon with the winning teams celebrations.
                <span className="font-bold">Predict and shine</span>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </GamingLayout>
  );
};

export default index;
