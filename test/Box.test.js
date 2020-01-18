const {
    accounts,
    contract
} = require('@openzeppelin/test-environment');
const {
    expect
} = require('chai');
const {
    BN,
    expectEvent,
    expectRevert
} = require('@openzeppelin/test-helpers');

const Box = contract.fromArtifact('Box');

describe('Box', function () {
    const [owner, other] = accounts;

    beforeEach(async function () {
        this.contract = await Box.new({
            from: owner
        });
        await this.contract.initialize(owner);
    });

    it('retrives returs a value previously stored', async function () {
        await this.contract.store(41, {
            from: owner
        });

        expect((await this.contract.retrieve())).to.be.bignumber.equal(new BN('42'));
    });

    it('store emits an event', async function () {
        const receipt = await this.contract.store(new BN('41'), { from: owner });

        expectEvent(receipt, 'ValueChanged', { newValue: new BN('42') });
    });

    it('non owner cannot store a value', async function () {
        await expectRevert(
            this.contract.store(new BN('41'), { from: other }),
            'Ownable: caller is not the owner'
        )
    })
})