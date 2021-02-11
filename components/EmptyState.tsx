import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

import DashboardShell from "./DashboardShell";
import AddSiteModal from "./AddSiteModal";

function EmptyState() {
  return (
    <DashboardShell>
      <Flex
        width="100%"
        backgroundColor="white"
        borderRadius="8px"
        p={16}
        justify="center"
        align="center"
        direction="column"
      >
        <Heading size="lg" mb={2}>
          You haven't added any sites.
        </Heading>
        <Text mb={4}>Let's get started.</Text>
        <AddSiteModal />
      </Flex>
    </DashboardShell>
  );
}

export default EmptyState;
