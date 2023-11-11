import {ethers} from '@axiomesh/axiom'
import abi from '@/configs/abi.json'
import {EtherProject} from "@/interfaces/Project";

export const contractAddress = '0xe47EdA2f0803443FF8b402F9C08520A6e3a6D7DD'; // 智能合约地址
const contractABI = abi; // 智能合约的ABI

export async function donate(projectId: number, username: string, extra: any) {

    if (typeof window !== 'undefined') {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        console.log('开始donate')
        const contract = new ethers.Contract(contractAddress, contractABI, await signer);
        const donationAmount = ethers.parseEther('1'); // 捐款金额，以太为单位
        const transaction = await contract.donate(0, username, extra);
        // 等待交易确认
        await transaction.wait();
        // 获取返回值
        const filter = contract.filters.DonationReceived
        const events = await contract.queryFilter(filter);

        if (events.length == 0) {
            return 0
        }

        // @ts-ignore
        const donor = events[events.length - 1]?.args.donor;
        // @ts-ignore
        const amount = events[events.length - 1]?.args.amount;

        console.log('projectId: ', donor);
        console.log('amount: ', Number(amount));

        return 1

    }

    return 0
}

// 调用 createProject
export async function createProject(deadline: number): Promise<number> {

    if (typeof window !== 'undefined') {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractABI, await signer);
        const transaction = await contract.createProjectAutoApproved(deadline);
        // 等待交易确认
        await transaction.wait();

        // 获取返回值
        const filter = contract.filters.ProjectCreated
        const events = await contract.queryFilter(filter);

        console.log('events: ', events);

        if (events.length == 0) {
            return -1;
        }

        // @ts-ignore
        const projectId = events[events.length - 1]?.args.projectId;
        // @ts-ignore
        const startTime = events[events.length - 1]?.args.startTime;

        console.log('projectId: ', projectId);
        console.log('startTime: ', startTime);

        return Number(projectId);
    }

    return -1;
}

export async function cancelProject(projectId: string): Promise<number> {

    if (typeof window !== 'undefined') {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractABI, await signer);
        const transaction = await contract.cancelProject(parseInt(projectId));
        // 等待交易确认
        await transaction.wait();

        // 获取返回值
        const filter = contract.filters.ProjectCancelled
        const events = await contract.queryFilter(filter);

        console.log('events: ', events);

        if (events.length == 0) {
            return -1
        }

        // @ts-ignore
        const returnId = events[events.length - 1]?.args.projectId;

        console.log('returnId: ', returnId);

        return 1;
    }

    return -1;
}

export async function withdrawFunds(projectId: string): Promise<number> {

    if (typeof window !== 'undefined') {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractABI, await signer);
        const transaction = await contract.withdrawFunds(projectId);
        // 等待交易确认
        await transaction.wait();

        // 获取返回值
        const filter = contract.filters.FundsReleased
        const events = await contract.queryFilter(filter);

        console.log('events: ', events);

        if (events.length == 0) {
            return 0;
        }

        // @ts-ignore
        const projectOwner = events[events.length - 1]?.args.projectOwner;
        // @ts-ignore
        const amount = events[events.length - 1]?.args.amount;

        console.log('projectId: ', projectOwner);
        console.log('startTime: ', amount);

        return 1;
    }

    return 0;
}

export async function getFundDetailById(projectId: string) {

    if (typeof window !== 'undefined') {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        try {
            const contract = new ethers.Contract(contractAddress, contractABI, await signer);
            const result = await contract.getProjectDetails(parseInt(projectId));

            // 解析返回值
            const [
                projectOwner,
                totalDonations,
                projectClosed,
                startTime,
                deadline,
                fundsReleased,
                approvalDeadline,
                isApproved
            ] = result;

            // 在这里处理返回值
            console.log('Project Owner:', projectOwner);
            console.log('Total Donations:', totalDonations);
            console.log('Project Closed:', projectClosed);
            console.log('Start Time:', startTime);
            console.log('Deadline:', deadline);
            console.log('Funds Released:', fundsReleased);
            console.log('Approval Deadline:', approvalDeadline);
            console.log('Is Approved:', isApproved);

            return new EtherProject(
                projectOwner, totalDonations, projectClosed, startTime, deadline, fundsReleased, approvalDeadline, isApproved
            )

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    return null;
}

export async function getDonationById(projectId: string) {

    if (typeof window !== 'undefined') {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        try {
            const contract = new ethers.Contract(contractAddress, contractABI, await signer);
            const donationList = await contract.getDonationsByTime(parseInt(projectId));
            // 在这里处理返回值
            console.log('DonationList:', donationList);
            // 将捐款列表转换为 Donation 类型的数组，并更新状态变量
            const formattedDonations: Donation[] = donationList.map((donation: any) => ({
                username: donation.username,
                donor: donation.donor,
                amount: parseInt(donation.amount),
                timestamp: parseInt(donation.timestamp),
            }));
            return formattedDonations;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    return null;
}